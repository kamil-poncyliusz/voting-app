import { Poll, PollConstructor } from "./Poll";

class PollManager {
  constructor() {
    this.polls = {};
  }
  polls: { [key: number]: Poll };
  createPoll(poll: PollConstructor): number {
    const id = Object.keys(this.polls).length;
    this.polls[id] = new Poll(poll);
    return id;
  }
  getPoll(id: number): Poll | null {
    if (!this.polls[id]) return null;
    return this.polls[id];
  }
}

export default PollManager;
