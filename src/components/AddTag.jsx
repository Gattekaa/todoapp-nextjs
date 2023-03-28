import { AuthContext } from "@/contexts/AuthContext";
import fetchNewTag from "@/helpers/fetchNewTag";
import { useContext } from "react";
import { IoMdAdd } from "react-icons/io";

export const AddTag = ({setFetch, setNewTag, socket, initialState, newTag, sfetch, iserror}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col  rounded-sm items-center justify-between mt-8 bg-dark-background-light/50 dark:bg-dark-background-primary text-dark-background-base dark:text-dark-typography-base">
      <div className="flex gap-4 w-full h-[65px] px-8 py-2 items-center justify-between">
        <button className="w-[30px] flex-shrink-0 h-[30px] rounded-full border-2 border-dark-typography-light cursor-default flex justify-center items-center"></button>
        <form
          className="w-full"
          id="newTagForm"
          onSubmit={(e) =>
            fetchNewTag(
              e,
              setFetch,
              setNewTag,
              socket,
              initialState,
              user,
              newTag
            )
          }
        >
          <input
            type="text"
            placeholder="Add a tag"
            required
            disabled={sfetch}
            value={newTag.title}
            maxLength={80}
            onChange={(e) => setNewTag({ ...newTag, title: e.target.value })}
            className="w-full h-full bg-transparent outline-none placeholder:text-dark-background-base placeholder:dark:text-dark-typography-base"
          />
        </form>
      </div>
      <div className="w-full flex justify-end bg-dark-background-light/50 px-8 py-2 dark:bg-dark-border-light">
        <button
          type="submit"
          form="newTagForm"
          disabled={sfetch}
          className="px-2 py-1 bg-dark-background-light/50 dark:bg-dark-background-primary hover:opacity-60 duration-150"
        >
          <IoMdAdd size={20} />
        </button>
      </div>
    </div>
  );
};
