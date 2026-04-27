<script lang="ts">
  import type { CampaignStepsBlock } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import Icon from '$lib/components/ui/Icon.svelte'

  type Props = { block: CampaignStepsBlock }
  let { block }: Props = $props()

  // Absolute positions on the desktop map card (% of 1337×669 Figma viewbox).
  // dotAbove: the connector dot and path entry line are at the top of the card.
  const STEP_CONFIG = [
    { left: 5.4, top: 36, dotAbove: true },
    { left: 27, top: 2, dotAbove: false },
    { left: 55, top: 46, dotAbove: true },
    { left: 76, top: 11, dotAbove: false }
  ] as const
</script>

<Section
  id={block.sectionId}
  title={block.title}
  intro={block.intro ?? ''}
  backgroundImage={block.backgroundImage}
  backgroundColor={block.backgroundColor}
>
  <!-- ── Desktop map view (lg+) ──────────────────────────────────── -->
  <div
    class="relative w-full overflow-hidden rounded-2xl border border-[#48494b] bg-[#2c2c2c] hidden lg:block"
    style="aspect-ratio: 1337/669"
  >
    <!-- Topographic map texture -->
    <img
      src="/campaign-map-bg.png"
      alt=""
      class="absolute inset-0 size-full object-cover opacity-50 pointer-events-none select-none"
      draggable="false"
    />

    <!-- Dashed red trail path connecting all steps -->
    <svg style="padding: 100px 0 60px 60px" viewBox="0 0 1337 669" fill="none" aria-hidden="true">
      <path
        d="M1.95413 529.67C27.4541 412.671 117.954 507.171 128.454 360.171C132.425 304.581 89.9541 169.671 188.454 137.671C230.474 124.02 297.454 187.407 384.454 164.171C464.954 142.671 563.454 131.671 563.454 287.671C563.454 360.171 595.954 445.171 740.454 425.171C796.803 417.372 734.992 276.707 826.454 243.171C901.454 215.671 843.454 95.1707 885.454 38.1708C927.454 -18.8292 999.454 -11.8293 1050.45 83.1707C1082.73 143.298 1038.45 207.171 1168.45 215.671C1230.67 219.739 1238.45 273.671 1238.45 366.671"
        stroke="#dc2726"
        stroke-width="2.5"
        stroke-dasharray="10 7"
      />
    </svg>

    <!-- Compass rose (top-left) -->
    <div class="absolute" style="left: 5.2%; top: 7%;">
      <svg viewBox="0 0 72 72" class="w-14 h-14" aria-hidden="true" fill="none">
        <circle cx="36" cy="36" r="27" stroke="#3d4248" stroke-width="1" />
        <circle cx="36" cy="36" r="2.5" fill="#8a9097" />
        <path d="M36,11 L33.5,30 L38.5,30 Z" fill="#8a9097" />
        <path d="M36,61 L33.5,42 L38.5,42 Z" fill="#4a4f55" />
        <path d="M11,36 L30,33.5 L30,38.5 Z" fill="#4a4f55" />
        <path d="M61,36 L42,33.5 L42,38.5 Z" fill="#4a4f55" />
      </svg>
      <span
        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 font-mono text-[8px] text-[#8a9097]"
        >N</span
      >
      <span
        class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 font-mono text-[8px] text-[#4a4f55]"
        >S</span
      >
      <span
        class="absolute top-1/2 left-0 -translate-x-2 -translate-y-1/2 font-mono text-[8px] text-[#4a4f55]"
        >W</span
      >
      <span
        class="absolute top-1/2 right-0 translate-x-2 -translate-y-1/2 font-mono text-[8px] text-[#4a4f55]"
        >E</span
      >
    </div>

    <!-- Coordinates text -->
    <p
      class="absolute font-mono text-[#8a9097]/20 tracking-wider"
      style="left: 3.5%; top: 19%; font-size: 0.6rem;"
    >
      51.9244° N, 4.4777° E
    </p>

    <!-- START label -->
    <div class="absolute flex items-center gap-1.5" style="left: 4.7%; top: 91%;">
      <span class="size-2.5 rounded-full bg-orijen-red shrink-0 inline-block"></span>
      <span class="text-white/30 tracking-widest text-sm">START</span>
    </div>

    <!-- FINISH label -->
    <div class="absolute flex items-center gap-1.5" style="left: 87.5%; top: 66%;">
      <span class="text-white/30 tracking-widest text-sm">FINISH</span>
      <span class="size-2.5 rounded-full bg-orijen-red shrink-0 inline-block"></span>
    </div>

    <!-- Scale bar (bottom-right) -->
    <div
      class="absolute font-mono text-[#8a9097]/20 flex flex-col gap-0.5"
      style="left: 87%; top: 90.5%; font-size: 0.55rem;"
    >
      <div class="flex justify-between" style="width: 5.5rem;">
        <span>0</span><span>5</span><span>10</span>
      </div>
      <div class="border-t border-[#8a9097]/20" style="width: 5.5rem;"></div>
    </div>

    <!-- Step cards (up to 4, absolutely positioned on the map) -->
    {#each block.steps as step, i}
      {@const pos = STEP_CONFIG[i]}
      {#if pos}
        <div
          class="absolute flex flex-col items-center"
          style="left: {pos.left}%; top: {pos.top}%; width: 21.7%;"
        >
          {#if pos.dotAbove}
            <!-- Connector dot above card -->
            <svg class="size-10 shrink-0 mb-0.5" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="7" fill="rgba(220,39,38,0.12)" />
              <circle cx="10" cy="10" r="4" fill="#dc2726" />
            </svg>
          {/if}

          <div
            class="w-full bg-[#212122] border border-[#48494b] rounded-lg overflow-hidden flex flex-col h-48"
          >
            {#if pos.dotAbove}
              <!-- Horizontal connector line at top (path arrives here) -->
              <div class="h-px w-[90%] mx-auto bg-[#48494b]"></div>
            {/if}

            <div class="px-3 pt-3 pb-3 flex flex-col gap-2">
              <!-- Step label -->
              <div>
                <p
                  class="font-sans font-bold text-orijen-red uppercase tracking-wider leading-none"
                  style="font-size: 0.65rem; letter-spacing: 0.08em;"
                >
                  STAP {i + 1}&nbsp;/&nbsp;{step.title}
                </p>
                <div
                  class="mt-1.5 h-px w-full"
                  style="background: rgba(220,39,38,0.3); transform: rotate(-0.3deg);"
                ></div>
              </div>

              <!-- Step icon -->
              {#if step.icon}
                <div class="flex justify-center py-1">
                  <Icon name={step.icon} class="size-16 text-orijen-red" />
                </div>
              {/if}

              <!-- Step description -->
              {#if step.description}
                <p class="font-display text-white text-center uppercase text-2xl pb-1">
                  {step.description}
                </p>
              {/if}
            </div>

            {#if !pos.dotAbove}
              <!-- Horizontal connector line at bottom (path arrives here) -->
              <!-- <div class="h-px w-[90%] mx-auto bg-orijen-red"></div> -->
            {/if}
          </div>

          {#if !pos.dotAbove}
            <!-- Connector dot below card -->
            <svg class="size-10 shrink-0 mb-0.5" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="7" fill="rgba(220,39,38,0.12)" />
              <circle cx="10" cy="10" r="4" fill="#dc2726" />
            </svg>
          {/if}
        </div>
      {/if}
    {/each}

    <!-- Vertical dotted line from behind photos down to X cross (center = 38.4%) -->
    <div
      class="absolute pointer-events-none"
      style="left: 41.5%; top: 60%; height: 32%; width: 2px; background: repeating-linear-gradient(to bottom, #dc2726 0px, #dc2726 5px, transparent 5px, transparent 10px);"
    ></div>

    <!-- Trail photo 1 (Rottemeren, left/back) -->
    <img
      src="/campaign-trail-photo-1.png"
      alt=""
      class="absolute pointer-events-none select-none rounded shadow-md"
      style="left: 26%; top: 55%; width: 18.5%; rotate: -15.9deg;"
      draggable="false"
    />
    <!-- Trail photo 2 (Kijfwilderland, right/front) -->
    <img
      src="/campaign-trail-photo-2.png"
      alt=""
      class="absolute pointer-events-none select-none rounded shadow-md"
      style="left: 36%; top: 40%; width: 21%; rotate: 16.92deg;"
      draggable="false"
    />
    <!-- X cross mark between photos -->
    <svg
      class="absolute pointer-events-none"
      style="left: 40%; top: 90%; width: 2.8%;"
      viewBox="0 0 30 30"
      aria-hidden="true"
    >
      <line
        x1="5"
        y1="5"
        x2="25"
        y2="25"
        stroke="#dc2726"
        stroke-width="4"
        stroke-linecap="round"
      />
      <line
        x1="25"
        y1="5"
        x2="5"
        y2="25"
        stroke="#dc2726"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>

    <!-- Patch badge (near step 4) -->
    <img
      src="/campaign-patch-badge.png"
      alt=""
      class="absolute pointer-events-none select-none"
      style="left: 63%; top: 7%; width: 17%; rotate: -13.13deg; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));"
      draggable="false"
    />
  </div>

  <!-- ── Mobile layout (<lg) ──────────────────────────────────────── -->
  <div class="lg:hidden relative overflow-hidden rounded-2xl border border-[#48494b] bg-[#2c2c2c]">
    <!-- Topo texture (reduced opacity on mobile) -->
    <img
      src="/campaign-map-bg.png"
      alt=""
      class="absolute inset-0 size-full object-cover opacity-25 pointer-events-none select-none"
      draggable="false"
    />

    <div class="relative flex flex-col items-center px-4 py-8 gap-0">
      <!-- START -->
      <div class="flex items-center gap-2 mb-3">
        <span class="size-2.5 rounded-full bg-orijen-red shrink-0 inline-block"></span>
        <span class="font-sans text-white/30 text-xs tracking-widest">START</span>
      </div>

      {#each block.steps as step, i}
        <!-- Vertical dashed connector -->
        <svg class="shrink-0" width="2" height="32" aria-hidden="true">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="32"
            stroke="#dc2726"
            stroke-width="2"
            stroke-dasharray="6 4"
            opacity="0.7"
          />
        </svg>

        <!-- Connector dot -->
        <svg class="size-5 shrink-0" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="4" fill="#dc2726" />
        </svg>

        <!-- Step card -->
        <div
          class="mt-1 mb-1 w-full max-w-72.5 bg-[#212122] border border-[#48494b] rounded-lg overflow-hidden"
        >
          <div class="px-4 pt-3 pb-4 flex flex-col gap-2">
            <p
              class="font-sans font-bold text-orijen-red text-sm uppercase tracking-wider leading-none"
            >
              STAP {i + 1}&nbsp;/&nbsp;{step.title}
            </p>
            <div class="h-px w-full" style="background: rgba(220,39,38,0.3);"></div>
            {#if step.icon}
              <div class="flex justify-center py-2">
                <Icon name={step.icon} class="size-14 text-orijen-red" />
              </div>
            {/if}
            {#if step.description}
              <p class="font-display text-2xl text-white text-center uppercase leading-tight">
                {step.description}
              </p>
            {/if}
          </div>
        </div>

        <!-- Trail photos cluster after step 2 (index 1) -->
        {#if i === 1}
          <div class="relative w-full h-52 my-4 shrink-0">
            <img
              src="/campaign-trail-photo-1.png"
              alt=""
              class="absolute w-36 h-36 object-cover rounded shadow-md pointer-events-none"
              style="left: 5%; top: 35%; rotate: -15.9deg;"
              draggable="false"
            />
            <img
              src="/campaign-trail-photo-2.png"
              alt=""
              class="absolute w-40 h-40 object-cover rounded shadow-md pointer-events-none"
              style="right: 5%; top: 0; rotate: 16.92deg;"
              draggable="false"
            />
            <svg
              class="absolute pointer-events-none"
              style="left: 43%; bottom: 5%; width: 14%;"
              viewBox="0 0 30 30"
              aria-hidden="true"
            >
              <line
                x1="5"
                y1="5"
                x2="25"
                y2="25"
                stroke="#dc2726"
                stroke-width="4"
                stroke-linecap="round"
              />
              <line
                x1="25"
                y1="5"
                x2="5"
                y2="25"
                stroke="#dc2726"
                stroke-width="4"
                stroke-linecap="round"
              />
            </svg>
          </div>
        {/if}
      {/each}

      <!-- FINISH -->
      <svg class="shrink-0" width="2" height="32" aria-hidden="true">
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="32"
          stroke="#dc2726"
          stroke-width="2"
          stroke-dasharray="6 4"
          opacity="0.7"
        />
      </svg>
      <div class="flex items-center gap-2 mt-1">
        <span class="font-sans text-white/30 text-xs tracking-widest">FINISH</span>
        <span class="size-2.5 rounded-full bg-orijen-red shrink-0 inline-block"></span>
      </div>

      <!-- Patch badge at bottom -->
      <div class="mt-10 mb-2 flex justify-center">
        <img
          src="/campaign-patch-badge.png"
          alt=""
          class="w-28 h-28 object-contain"
          style="rotate: -13.13deg; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));"
          draggable="false"
        />
      </div>
    </div>
  </div>
</Section>
