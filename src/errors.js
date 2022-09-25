let unexpectedError = { error: 'Unexpected error' }
class UnexpectedError extends Error{
    error = 'Unexpected error'
}

export class RequestAbortedError extends UnexpectedError{
    code = -1
    message_for_developer = 'Request aborted'
}
export class IncorrectStatusError extends UnexpectedError{
    code = -2
    message_for_developer =  'Backend returned incorrect status'
}
export class  UnexpectedFieldCodeError extends UnexpectedError {
    code = -3
    message_for_developer =  'Backend returned field `code`'
}