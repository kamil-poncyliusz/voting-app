import { deleteOption } from "../../routes/api-request-handlers";
import { Poll, PollStatus } from "./Poll";

export interface VoterConstructor {
  poll: Poll;
  name: string;
}

export class Voter {
  constructor(voter: VoterConstructor) {
    this.poll = voter.poll;
    this.addedOptions = [];
    this.prefferences = [];
    this.name = voter.name;
    this.voted = false;
  }
  poll: Poll;
  name: string;
  addedOptions: string[];
  prefferences: number[];
  voted: boolean;
  addOption(option: string): boolean {
    if (this.poll.status !== PollStatus.CreatingOptions) return false;
    if (this.addedOptions.length >= this.poll.optionsPerVoter) return false;
    if (this.poll.options.includes(option)) return false;
    this.addedOptions.push(option);
    return true;
  }
  deleteOption(option: string): boolean {
    if (this.poll.status !== PollStatus.CreatingOptions) return false;
    const index = this.addedOptions.indexOf(option);
    if (index === -1) return false;
    this.addedOptions.splice(index, 1);
    return true;
  }
  vote(prefferences: number[]): boolean {
    if (this.poll.status !== PollStatus.Voting) return false;
    if (this.voted) return false;
    if (prefferences.length !== this.poll.options.length) return false;
    const sorted = prefferences.slice().sort();
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] !== i) return false;
    }
    this.prefferences = prefferences;
    this.voted = true;
    return true;
  }
}
