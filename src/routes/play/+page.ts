export function load({ url }) {

    const game_id = url.searchParams.get('game_id');
    const faction_id = url.searchParams.get('faction_id');

    if (!game_id || !faction_id) {
        throw Error('Either gameid or faction id not provided')
    }

    return {
        game_id: game_id,
        faction_id: faction_id
    }
}