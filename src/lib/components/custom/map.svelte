<script lang='ts'>
    import { STRATEGY_MAP_COLORS } from "./mapColors";

    import {
        Crown,
        Triangle,
        Sword
    } from '@lucide/svelte'

    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import Label from "../ui/label/label.svelte";

    let {
        game
    } = $props()

    let faction_order = $derived(game?.factions?.map((f) => f.faction_id))

    function getFactionColor(faction_id: string) {
        return STRATEGY_MAP_COLORS[
            faction_order.indexOf(faction_id)
        ]
    }

    let width = $state(0)
    let height = $state(0)

</script>

<!-- As game is initialy null -->
{#if game}

    <div
        bind:clientWidth={width}
        bind:clientHeight={height}
        class='w-4/5 h-3/5 md:w-3/5 md:h-4/5'
    >
        <svg
            width={width}
            height={height}
            class="absolute p-4"
        >

            <!-- 1. PROVINCES -->
            {#each game.provinces as p}
                <polygon 
                    points={p.border.map((b) => `${b[0] * width},${b[1] * height}`).join(' ')}
                    style={`
                        fill:${p.is_ocean ? 'cyan' : getFactionColor(p.faction_id)};
                        stroke-width: 1;
                        stroke:black;
                    `}
                />
            {/each}

            <!-- 2. CITIES -->
            {#each game.provinces as p}
                {#if p?.city?.is_capital}
                    <g transform="translate({p.centriod[0] * width - 8.5}, {p.centriod[1] * height - 8.5})">
                        <Crown size={17} class="fill-amber-300" />
                    </g>
                {:else if p?.city}
                    <g transform="translate({p.centriod[0] * width - 8.5}, {p.centriod[1] * height - 8.5})">
                        <Triangle size={17} class="fill-black" />
                    </g>
                {/if}
            {/each}

            <!-- 3. ARMIES (ALWAYS ON TOP) -->
            {#each game.provinces as p}
                <foreignObject 
                    x={p.centriod[0] * width}
                    y={p.centriod[1] * height}
                    width="200"
                    height="200"
                >
                    <div xmlns="http://www.w3.org/1999/xhtml" class="flex flex-col">
                        {#each p.army as a}
                            <div class="flex items-center bg-white/20 rounded-md w-fit p-1">
                                <div
                                 class='bg-white rounded-full w-1 aspect-square self-start'
                                >
                                </div>
                                <Sword 
                                    size={15}
                                    fill={getFactionColor(a.faction_id)}
                                />
                                <small>
                                    {a.numbers}
                                </small>
                            </div>
                        {/each}
                    </div>
                </foreignObject>
            {/each}

        </svg>

    </div>

    <!-- Toggles -->
     <div

     >



     </div>

{/if}