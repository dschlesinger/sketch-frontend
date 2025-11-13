export function attachGame(state: { messages: string[] }, game_id: string, faction_id: string) {
    if (!game_id || !faction_id) throw new Error('Game ID or Faction ID not provided');

    // Construct query params
    const params = new URLSearchParams({ game_id, faction_id });
    const evtSource = new EventSource(`/api/attach-game?${params.toString()}`);

    evtSource.onmessage = (event) => {
        state.messages.push(event.data);
    };

    evtSource.onerror = (err) => {
        console.error('SSE error', err);
        evtSource.close();
    };

    return evtSource; // Return it in case caller wants to close it later
}

export async function sendUpdate(message: string) {
    const res = await fetch('/api/attach-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });

    if (!res.ok) {
        throw new Error(`Failed to send update: ${res.statusText}`);
    }

    return res.json();
}
