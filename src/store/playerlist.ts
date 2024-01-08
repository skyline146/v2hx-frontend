import { create } from "zustand";
import { IPlayerlist, IPlayerRow } from "shared/lib/types";
// import { produce } from "immer";

type Action = {
  setPlayers: (users: IPlayerRow[]) => void;
  setTotal: (total: number) => void;
  updatePlayer: (data: IPlayerRow) => void;
};

// Create your store, which includes both state and (optionally) actions
export const usePlayerlistStore = create<IPlayerlist & Action>((set) => ({
  players: [],
  total: 0,
  setPlayers: (players: IPlayerRow[]) => set(() => ({ players })),
  setTotal: (total: number) => set(() => ({ total })),
  updatePlayer: (data: IPlayerRow) =>
    set((state) => ({
      players: state.players.map((player) => (player.id === data.id ? data : player)),
    })),
}));
