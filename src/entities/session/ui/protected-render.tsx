interface IProtectedRender {
  admin: boolean;
  children: React.ReactNode;
}

export const ProtectedRender = ({ admin, children }: IProtectedRender) => {
  return admin ? children : null;
};
