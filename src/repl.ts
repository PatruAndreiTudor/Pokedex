import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const trimmed = input.trim();
  const lowered = trimmed.toLocaleLowerCase();
  const separatedWords = lowered.split(" ");
  return separatedWords;
}

export function startREPL(state: State) {
  const rl = state.interf;
  const commands = state.commands;

  rl.prompt();
  rl.on("line", async (input) => {
    const cleaned = cleanInput(input);
    if (input.length === 0) {
      rl.prompt();
    }
    if (!commands[cleaned[0]]) {
      console.log("Unknown command");
    } else {
      try {
        await commands[cleaned[0]].callback(state, ...cleaned.slice(1));
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    }
    rl.prompt();
  });
}
