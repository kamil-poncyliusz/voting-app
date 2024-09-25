enum PollStatus {
  NotStarted = 0,
  CreatingOptions = 1,
  Voting = 2,
  Closed = 3,
}

export interface VoterConstructor {
  poll: Poll;
  name: string;
}

export interface PollConstructor {
  title: string;
  question: string;
  optionsPerVoter: number;
  minutesForJoining: number;
  minutesForVoting: number;
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
  createVoter(voterConstructor: VoterConstructor): number {
    for (const voter of this.voters) {
      if (voter.name === voterConstructor.name) return -1;
    }
    const newVoter = new Voter(voterConstructor);
    const newLength = this.voters.push(newVoter);
    return newLength - 1;
  }
  getVoter(id: number): Voter {
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
