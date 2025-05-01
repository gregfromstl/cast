export type User = {
	displayName: string;
	pfpUrl: string;
}

export type Comment = {
	author: User;
	text: string;
	createdAt: Date;
}

export type Cast = {
	author: User;
	text: string;
	likes: number;
	recasts: number;
	comments: Array<Comment>;
	createdAt: Date;
}
