import { exec } from 'child_process';

export async function isRunningProc(query: string) {
  let cmd = '';
  switch (process.platform) {
    case 'win32':
      cmd = `tasklist`;
      break;
    case 'darwin':
      cmd = `ps -ax | grep ${query}`;
      break;
    case 'linux':
      cmd = `ps -A`;
      break;
    default:
      break;
  }

  return pexec(cmd, (err, stdout, stderr) => {
    return stdout.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
}

export async function pexec(cmd: string, cb: (err: any, stdout: any, stderr: any) => void) {
  return new Promise((resolve, reject) =>
    exec(cmd, (err, stdout, stderr) => {
      resolve(cb(err, stdout, stderr));
    }),
  );
}
