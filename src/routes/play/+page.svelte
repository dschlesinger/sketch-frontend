<script lang='ts'>

    import { onMount } from "svelte";
    import { attachGame, sendUpdate } from "$lib/calls/gameSocket";

    let {
        data
    } = $props();

    let updates = $state({ messages: [] })

    onMount(async () => {
        attachGame(updates, data.game_id, data.faction_id)
    })

</script>

{data.game_id}{data.faction_id}