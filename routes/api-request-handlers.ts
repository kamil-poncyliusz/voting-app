import { Request, Response } from "express";

export function readPoll(req: Request, res: Response) {
  return { message: `Reading poll ${req.params.pollId}` };
}

export function createPoll(req: Request, res: Response) {
  return { message: "Creating a new poll" };
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
