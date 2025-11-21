export const CORE_MISSION_QUESTS_ENDPOINT = "/mission/quests";
export const CORE_MISSION_TREASURE_ENDPOINT = "/mission/treasure";
export const CORE_MISSION_TREASURE_CLAIM_ENDPOINT = (treasureId: string) => `/mission/treasures/${treasureId}/claim`;
export const CORE_MISSION_QUEST_PERFORM_ENDPOINT = (questId: string) => `/mission/quests/${questId}/perform`;
export const CORE_MISSION_SYNC_PROGRESS_ENDPOINT = "/mission/sync-progress";