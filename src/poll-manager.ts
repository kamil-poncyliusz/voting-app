enum PollStatus {
  CreatingOptions = 1,
  Voting = 2,
  Closed = 3,
}

class Voter {
  constructor() {
    this.options = [];
  }
  options: string[];
}

class Poll {
  constructor() {
    this.title = "";
    this.question = "";
    this.status = PollStatus.CreatingOptions;
    this.optionsPerVoter = 1;
    this.minutesForJoining = 3;
    this.minutesForVoting = 3;
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
      options.push(...voter.options);
    }
    return options;
  }
  createVoter() {
    //
  }
  startVotingPhase() {
    //
  }
  close() {
    //
  }
  start() {
    setTimeout(() => {
      this.startVotingPhase();
      setTimeout(() => {
        this.close();
      }, this.minutesForVoting * 60 * 1000);
    }, this.minutesForJoining * 60 * 1000);
  }
}

class PollManager {
  constructor() {
    this.polls = {};
  }
  polls: { [key: number]: Poll };
  createPoll() {
    //
  }
  getPoll(id: number) {
    return this.polls[id];
  }
}
