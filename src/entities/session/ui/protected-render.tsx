interface IProtectedRender {
  allowed: boolean | undefined;
  children: React.ReactNode;
}

export const ProtectedRender = ({ allowed, children }: IProtectedRender) => {
  return allowed ? children : null;
};
