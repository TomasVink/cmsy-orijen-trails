<script lang="ts">
  import { page } from '$app/stores'
  import Button from '$lib/components/ui/Button.svelte'

  const labels = {
    nl: {
      notFound: 'Pagina niet gevonden',
      error: 'Er ging iets mis',
      notFoundMessage: 'De pagina die je zoekt bestaat niet of is verplaatst.',
      errorMessage: 'Er is een onverwachte fout opgetreden.',
      backHome: 'Terug naar home'
    },
    en: {
      notFound: 'Page not found',
      error: 'Something went wrong',
      notFoundMessage: "The page you're looking for doesn't exist or has been moved.",
      errorMessage: 'An unexpected error occurred.',
      backHome: 'Back to home'
    }
  }

  const t = $derived($page.params.locale === 'nl' ? labels.nl : labels.en)
</script>

<svelte:head>
  <title>{$page.status} — ORIJEN Trails</title>
</svelte:head>

<div class="min-h-dvh flex flex-col items-center justify-center p-32 text-center">
  <p class="font-display text-8xl uppercase leading-none text-orijen-gray/20 select-none">
    {$page.status}
  </p>
  <h1 class="font-display text-4xl uppercase leading-none my-4">
    {$page.status === 404 ? t.notFound : t.error}
  </h1>
  <p class="font-sans text-orijen-gray mt-4 max-w-sm">
    {$page.status === 404 ? t.notFoundMessage : ($page.error?.message ?? t.errorMessage)}
  </p>
  <div class="mt-8">
    <Button href=".">{t.backHome}</Button>
  </div>
</div>
