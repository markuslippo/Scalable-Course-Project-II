<script>
  import { userUuid } from "../stores/stores.js";
</script>

<nav style="background-color: #23262f" class="p-4 shadow-lg flex items-center justify-center">
  <div class="flex justify-between items-center w-full max-w-4xl">

    <a href="/">
    <span class="text-white text-2xl font-bold">Questions and Answers</span>
    </a>
    <span class="text-gray-400 text-sm">{$userUuid}</span>
  </div>
</nav>
