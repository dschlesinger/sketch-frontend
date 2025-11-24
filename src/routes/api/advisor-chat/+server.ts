export const GET = async ({ url }) => {
    const game_id = url.searchParams.get("game_id");
    const from_fid = url.searchParams.get("from_fid");
    const to_fid = url.searchParams.get("from_fid");
    const message = url.searchParams.get("message");

    console.log(game_id, from_fid, to_fid, message)

    const backendResponse = await fetch("http://localhost:8000/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            game_id,
            from_fid,
            to_fid,
            message
        })
    });

    console.log(backendResponse)

    return new Response(backendResponse.body, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        }
    });
};
