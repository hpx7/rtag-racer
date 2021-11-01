import { Methods, Context } from "./.rtag/methods";
import { UserData, Response } from "./.rtag/base";
import {
  Username,
  Tile,
  Acceleration,
  Powerup,
  Position,
  Dimension,
  MapObject,
  PlayerState,
  ICreateGameRequest,
  IJoinGameRequest,
  IStartGameRequest,
  ISetAccelerationRequest,
  Steering,
  ISetSteeringRequest,
} from "./.rtag/types";

type InternalPlayerInfo = {
  name: Username;
  dimension: Dimension;
  position: Position;
  rotation: number;
  score: number;
  powerup?: Powerup;
  velocity: number;
  steering: Steering;
  acceleration: Acceleration;
};

type InternalState = {
  map: Tile[];
  objects: MapObject[];
  players: InternalPlayerInfo[];
};

export class Impl implements Methods<InternalState> {
  createGame(user: UserData, ctx: Context, request: ICreateGameRequest): InternalState {
    return {
      map: [],
      objects: [],
      players: [createPlayer(ctx, user.name)],
    };
  }
  joinGame(state: InternalState, user: UserData, ctx: Context, request: IJoinGameRequest): Response {
    if (state.players.find((p) => p.name === user.name)) {
      return Response.error("Already joined");
    }
    state.players.push(createPlayer(ctx, user.name));
    return Response.ok();
  }
  startGame(state: InternalState, user: UserData, ctx: Context, request: IStartGameRequest): Response {
    return Response.error("Not implemented");
  }
  setSteering(state: InternalState, user: UserData, ctx: Context, request: ISetSteeringRequest): Response {
    return Response.error("Not implemented");
  }
  setAcceleration(state: InternalState, user: UserData, ctx: Context, request: ISetAccelerationRequest): Response {
    return Response.error("Not implemented");
  }
  getUserState(state: InternalState, user: UserData): PlayerState {
    return {
      map: state.map,
      objects: state.objects,
      players: state.players,
    };
  }
  onTick(state: InternalState, ctx: Context, timeDelta: number): void {}
}

function createPlayer(ctx: Context, name: string) {
  return {
    name,
    dimension: {
      width: 50,
      height: 100,
    },
    position: {
      x: ctx.randInt(1000),
      y: ctx.randInt(1000),
    },
    rotation: 0,
    score: 0,
    velocity: 0,
    steering: Steering.NONE,
    acceleration: Acceleration.NONE,
  };
}
