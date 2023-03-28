import { fetchTitleUpdate } from "@/helpers/fetchTitleUpdate";

export const EditModal = (setEditTag, setShowModal, socket, editTag, loading) => {
    return (
        <div className="absolute w-screen h-screen backdrop-blur-[2px] duration-150 z-[1000] flex justify-center items-center">
        <div className="w-[500px] h-fit rounded-xl px-4 py-10 text-center bg-background-neutral dark:bg-dark-background-base text-dark-background-base dark:text-dark-typography-base">
          <p className="font-bold text-xl">Edit</p>
          <form
            className="px-8 py-10"
            onSubmit={(e) => fetchTitleUpdate(e, editTag, socket, setShowModal)}
          >
            <div className="flex flex-col gap-8">
              <input
                type="text"
                placeholder="Title"
                value={editTag.title}
                disabled={loading}
                required
                onChange={(e) => {
                  e.stopPropagation(),
                    setEditTag({ ...editTag, title: e.target.value });
                }}
                className="w-full h-10 px-4 bg-background-neutral dark:bg-dark-background-base border-2 border-dark-background-light/50 dark:border-dark-background-light rounded-xl text-typography-light dark:text-dark-typography-base"
              />
              <div className="flex justify-around gap-4">
                <button className="bg-dark-background-neutral flex-1 py-4 rounded-xl">
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setEditTag({ ...editTag, done: !editTag.done }),
                      setShowModal(false);
                  }}
                  className="bg-dark-typography-light/50 flex-1 py-4 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}