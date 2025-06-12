<script lang="ts">
  import LoginForm from "$lib/components/login-form.svelte";
</script>
<div class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
  <div class="flex w-full max-w-sm flex-col gap-6">
    <a href="https://www.mceasy.com" class="flex items-center gap-2 self-center font-medium">
      <img src="https://www.mceasy.com/wp-content/uploads/2024/10/McEasy-Logo-2.webp" alt="McEasy Logo" class="h-8" />
    </a>
    <LoginForm />
  </div>
</div>