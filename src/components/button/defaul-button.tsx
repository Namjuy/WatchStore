export const DefaultButton = ({ content }: { content: string }) => {
  return (
    <button className="border-solid rounded px-3 p-1 text-white hover:text-yellow-600">
      {content}
    </button>
  );
};
export const DefaultButton1 = ({ content }: { content: string }) => {
  return (
    <button className="border-solid rounded mb-[1rem] px-3 p-1 text-white bg-yellow-600 hover:scale-[1.075] transition ease-in-out">
      {content}
    </button>
  );
};

export const DefaultButton2 = ({
  content,
  handleOk,
}: {
  content: string;
  handleOk: () => void;
}) => {
  return (
    <button onClick={handleOk} className="border-solid rounded mb-[1rem] px-3 p-1 text-white bg-yellow-600 hover:scale-[1.075] transition ease-in-out">
      {content}
    </button>
  );
};
