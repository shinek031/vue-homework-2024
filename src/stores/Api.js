export const Url = 'https://todolist-api.hexschool.io';

export const SignUpUrl = `${Url}/users/sign_up`;

export const SignInUrl = `${Url}/users/sign_in`;

export const SignOutUrl = `${Url}/users/sign_out`;

export const CheckoutUrl = `${Url}/users/checkout`;

export const GetTodoUrl = `${Url}/todos`;

export const InsTodoUrl = `${Url}/todos`;

export const UpdateTodoUrl = (id) => {
    return `${Url}/todos/${id}`
};

export const DelTodoUrl = (id) => {
    return `${Url}/todos/${id}`
};

export const ToggleTodoUrl = (id) => {
    return `${Url}/todos/${id}/toggle`
};