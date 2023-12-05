
export const ChangeNumberButton = ({ content, func }: { content: string; func: (item:any) => void }) => {
  return (
    <button
      className="w-6 h-6 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring focus:border-blue-300"
      onClick={func}
    >
      {content}
    </button>
  );
};