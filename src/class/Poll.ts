import { Voter, VoterConstructor } from "./Voter";

export enum PollStatus {
  NotStarted = 0,
  CreatingOptions = 1,
  Voting = 2,
  Closed = 3,
}

export interface PollConstructor {
  title: string;
  question: string;
  optionsPerVoter: number;
  minutesForJoining: number;
  minutesForVoting: number;
}

export class Poll {
  constructor(poll: PollConstructor) {
    this.title = poll.title;
    this.question = poll.question;
    this.status = PollStatus.NotStarted;
    this.optionsPerVoter = poll.optionsPerVoter;
    this.minutesForJoining = poll.minutesForJoining;
    this.minutesForVoting = poll.minutesForVoting;
    this.createdAt = new Date();
    this.voters = [];
  }
  title: string;
  question: string;
  status: PollStatus;
  optionsPerVoter: number;
  minutesForJoining: number;
  minutesForVoting: number;
  createdAt: Date;
  voters: Voter[];
  get options(): string[] {
    const options = [];
    for (const voter of this.voters) {
      options.push(...voter.addedOptions);
    }
    return options;
  }
  get info() {
    return {
      title: this.title,
      question: this.question,
      status: PollStatus[this.status],
      optionsPerVoter: this.optionsPerVoter,
      minutesForJoining: this.minutesForJoining,
      minutesForVoting: this.minutesForVoting,
      createdAt: this.createdAt,
      voters: this.voters.map((voter) => voter.name),
      options: this.options,
    };
  }
  createVoter(voterConstructor: VoterConstructor): number {
    for (const voter of this.voters) {
      if (voter.name === voterConstructor.name) return -1;
    }
    const newVoter = new Voter(voterConstructor);
    const newLength = this.voters.push(newVoter);
    return newLength - 1;
  }
  getVoter(id: number): Voter | null {
    if (!this.voters[id]) return null;
    return this.voters[id];
  }
  startCreatingOptions() {
    this.status = PollStatus.CreatingOptions;
  }
  startVoting() {
    this.status = PollStatus.Voting;
  }
  closeVoting() {
    this.status = PollStatus.Closed;
  }
  start() {
    this.startCreatingOptions();
    setTimeout(() => {
      this.startVoting();
      setTimeout(() => {
        this.closeVoting();
      }, this.minutesForVoting * 60 * 1000);
    }, this.minutesForJoining * 60 * 1000);
  }
}
