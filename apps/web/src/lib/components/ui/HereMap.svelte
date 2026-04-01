<script lang="ts">
  import { onMount, mount, unmount, untrack } from "svelte";
  import type { Trail } from "$lib/payload";
  import { env } from "$env/dynamic/public";
  import TrailMarker from "./TrailMarker.svelte";

  /* HERE Maps JS is loaded synchronously via CDN in app.html */
  declare const H: any;

  type Props = {
    trails: Trail[];
    selectedTrailId: number | null;
    onSelectTrail: (trail: Trail) => void;
    onDeselect?: () => void;
  };

  // ── Settings ─────────────────────────────────────────────────────
  const DEFAULT_CENTER = { lat: 52.37, lng: 4.89 };
  const DEFAULT_ZOOM = 10;
  const BOUNDS_PADDING = 0.2; // degrees added around the outermost markers when fitting
  const MARKER_SIZE = 32; // px — must match size-8 in TrailMarker.svelte

  // Map tile style.
  // layers.vector.normal.map  — vector (sharp, day palette)     ← current
  // layers.raster.normal.night — raster night tiles (true dark, slightly less sharp)
  // Vector tiles have no built-in night variant; for full brand-color control
  // create a custom style in HERE Studio (developer.here.com/studio) and swap for:
  //   const omvService = platform.getOMVService({ path: 'v2/vectortiles/core/mc' })
  //   const style = new H.map.Style('<your-style-yaml-url>')
  //   return new H.map.layer.TileLayer(new H.service.omv.Provider(omvService, style))
  const mapLayer = (layers: any): any => layers.vector.normal.map;

  // CSS filter applied over the entire map for brand-feel fine-tuning.
  // sepia + hue-rotate shifts the dark palette toward warm/earthy tones;
  // adjust or set to '' to disable.
  const MAP_FILTER = "brightness(0.8) contrast(1.5) hue-rotate(-15deg)";

  let { trails, selectedTrailId, onSelectTrail, onDeselect }: Props = $props();

  let container: HTMLDivElement;
  let map: any = null;
  let markersGroup: any = null;
  let mountedMarkers: ReturnType<typeof mount>[] = [];
  let showScrollHint = $state(false);
  let scrollHintTimer: ReturnType<typeof setTimeout> | null = null;
  let isMac = $state(false);

  function fitBounds(trailList: Trail[]) {
    if (!map || !markersGroup) return;
    const valid = trailList.filter(
      (t) => t.coordinates?.lat != null && t.coordinates?.lng != null,
    );
    if (valid.length === 0) return;
    const bbox = markersGroup.getBoundingBox();
    if (!bbox) return;
    const padded = new H.geo.Rect(
      bbox.getTop() + BOUNDS_PADDING,
      bbox.getLeft() - BOUNDS_PADDING,
      bbox.getBottom() - BOUNDS_PADDING,
      bbox.getRight() + BOUNDS_PADDING,
    );
    map.getViewModel().setLookAtData({ bounds: padded }, true);
  }

  function refreshMarkers(trailList: Trail[], selectedId: number | null) {
    if (!map || !markersGroup) return;

    for (const instance of mountedMarkers) unmount(instance);
    mountedMarkers = [];
    markersGroup.removeAll();

    const valid = trailList.filter(
      (t) => t.coordinates?.lat != null && t.coordinates?.lng != null,
    );

    for (const trail of valid) {
      const selected = trail.id === selectedId;

      const el = document.createElement("div");
      const instance = mount(TrailMarker, { target: el, props: { selected } });
      mountedMarkers.push(instance);

      const domIcon = new H.map.DomIcon(el, {
        anchor: { x: MARKER_SIZE / 2, y: MARKER_SIZE / 2 },
      });
      const marker = new H.map.DomMarker(
        { lat: trail.coordinates!.lat!, lng: trail.coordinates!.lng! },
        { icon: domIcon, data: trail, zIndex: selected ? 1 : 0 },
      );
      markersGroup.addObject(marker);
    }
  }

  onMount(() => {
    const platform = new H.service.Platform({
      apikey: env.PUBLIC_HERE_API_KEY,
    });
    const layers = platform.createDefaultLayers();

    map = new H.Map(container, mapLayer(layers), {
      zoom: DEFAULT_ZOOM,
      center: DEFAULT_CENTER,
    });

    if (MAP_FILTER) container.style.filter = MAP_FILTER;

    new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    H.ui.UI.createDefault(map, layers);

    const onResize = () => map.getViewPort().resize();
    window.addEventListener("resize", onResize);

    // On mobile, HERE Maps handles pinch-zoom via touch events — the wheel
    // handler never fires, so touch gestures are unaffected.
    // On desktop, block wheel events unless the modifier key is held so the
    // page scrolls normally. Show a hint overlay when the key isn't held.
    isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
    function onWheel(e: WheelEvent) {
      const modifierHeld = isMac ? e.metaKey : e.ctrlKey;
      if (!modifierHeld) {
        e.stopPropagation();
        showScrollHint = true;
        if (scrollHintTimer) clearTimeout(scrollHintTimer);
        scrollHintTimer = setTimeout(() => {
          showScrollHint = false;
        }, 1500);
      }
    }
    container.addEventListener("wheel", onWheel, true); // capture phase, before HERE Maps

    markersGroup = new H.map.Group();
    map.addObject(markersGroup);

    markersGroup.addEventListener("tap", (e: any) => {
      if (e.target && typeof e.target.getData === "function") {
        e.stopPropagation();
        onSelectTrail(e.target.getData() as Trail);
      }
    });

    map.addEventListener("tap", () => {
      onDeselect?.();
    });

    refreshMarkers(trails, selectedTrailId);
    fitBounds(trails);

    return () => {
      for (const instance of mountedMarkers) unmount(instance);
      container.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("resize", onResize);
      map.dispose();
    };
  });

  // Trails changed (filter applied) — rebuild markers and refit bounds.
  $effect(() => {
    const t = trails;
    if (map) {
      refreshMarkers(t, untrack(() => selectedTrailId));
      fitBounds(t);
    }
  });

  // Selection changed — rebuild markers only, no refit.
  $effect(() => {
    const s = selectedTrailId;
    if (map) refreshMarkers(untrack(() => trails), s);
  });
</script>

<div class="relative w-full h-full">
  <div bind:this={container} class="w-full h-full"></div>
  {#if showScrollHint}
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="bg-black/70 text-white px-4 py-2 rounded text-sm select-none">
        {isMac ? "Hold ⌘ to zoom the map" : "Hold Ctrl to zoom the map"}
      </div>
    </div>
  {/if}
</div>
