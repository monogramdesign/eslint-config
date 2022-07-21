import { promisify } from 'util'
import { exec as realExec } from 'child_process'

const exec = promisify(realExec)

export default exec
