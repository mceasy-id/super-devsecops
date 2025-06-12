interface LocalsType {
  user: {
    login: string;
    name: string;
    email: string;
    avatar_url: string;
  };
}

export const load = async ({ locals }: { locals: LocalsType; }) => {
  return {
    user: locals.user
  };
};
