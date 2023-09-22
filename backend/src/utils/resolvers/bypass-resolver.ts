const bypass = (reqPath: string) => {
  return ["/new", "/relevant", "/search"].includes(reqPath);
};

export default bypass;
