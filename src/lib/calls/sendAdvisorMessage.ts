export async function sendAdvisorMessage(game_id: string, from_fid: string, to_fid: string, message: string, token_stream) {
    return new Promise((resolve, reject) => {

        const params = new URLSearchParams({
            game_id,
            from_fid,
            to_fid,
            message
        });

        const u = `/api/advisor-chat?${params.toString()}`;

        const evtSource = new EventSource(u);

        evtSource.addEventListener("llm", (event) => {
            token_stream.current.push(event.data);
        });

        evtSource.addEventListener("done", () => {
            evtSource.close();
            resolve(null);
        });


        evtSource.onerror = (err) => {
            // console.error("SSE error", err);
            evtSource.close();
            resolve(null);
        };

    });
}
