type User = {
    id: string
    name: string
    email: string
}

export interface UserRepository {
    getUserById(id: string): Promise<User>
}
