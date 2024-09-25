import { Request, Response } from "express";
import pollManager from "../src/poll-manager";
import { Poll, PollConstructor } from "../src/class/Poll";

function isValidPollConstructor(payload: PollConstructor): boolean {
  if (typeof payload !== "object") return false;
  const {
    title,
    question,
    optionsPerVoter,
    minutesForJoining,
    minutesForVoting,
  } = payload;
  if (typeof title !== "string" || title.length === 0 || title.length > 60)
    return false;
  if (
    typeof question !== "string" ||
    question.length === 0 ||
    question.length > 60
  )
    return false;
  if (
    typeof optionsPerVoter !== "number" ||
    optionsPerVoter < 1 ||
    optionsPerVoter > 5
  )
    return false;
  if (
    typeof minutesForJoining !== "number" ||
    minutesForJoining < 1 ||
    minutesForJoining > 10
  )
    return false;
  if (
    typeof minutesForVoting !== "number" ||
    minutesForVoting < 1 ||
    minutesForVoting > 10
  )
    return false;
  return true;
}

export function readPoll(req: Request, res: Response): Poll | null {
  const pollId = parseInt(req.params.pollId);
  if (isNaN(pollId)) return null;
  const poll = pollManager.getPoll(pollId);
  return poll;
}

export function createPoll(req: Request, res: Response): number {
  const payload = req.body as PollConstructor;
  if (!isValidPollConstructor(payload)) return 0;
  const createdPollId = pollManager.createPoll(payload);
  return createdPollId;
}

export function createVoter(req: Request, res: Response) {
  return { message: `Creating a new voter for poll ${req.params.pollId}` };
}

export function updateVoter(req: Request, res: Response) {
  return {
    message: `Updating voter ${req.params.voterId} for poll ${req.params.pollId}`,
  };
}

export function createOption(req: Request, res: Response) {
  return { message: `Creating a new option for poll ${req.params.pollId}` };
}

export function deleteOption(req: Request, res: Response) {
  return {
    message: `Deleting option ${req.params.optionId} for poll ${req.params.pollId}`,
  };
}
