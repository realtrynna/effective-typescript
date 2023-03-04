class Meta {
    age: number;
    gender: boolean;
}

class Post extends Meta {
    title: string;
    content: string;

    constructor() {
        super();

    }
}

const user: Post = new Post();

user.content = "콘텐츠";