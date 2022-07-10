import { Button } from "@mantine/core";
export default function Navbar({ handleClick, text, handleConnect }) {
  return (
    <div
      id="home"
      className="flex items-center h-20 px-16 justify-between flex-col md:flex-row"
    >
      <div className="flex items-center lg:gap-16 gap-8">
        <div className="image">
          <div class="lg:w-1/3 text-baseColor">
            <a
              rel="noopener noreferrer"
              href="#"
              class="flex justify-center space-x-3 lg:justify-start"
            >
              <div class="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  class="flex-shrink-0 w-5 h-5 rounded-full dark:text-gray-900"
                >
                  <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                </svg>
              </div>
              <span class="self-center text-2xl font-semibold">HealthNet</span>
            </a>
          </div>
        </div>
        <div className="link-icons flex items-center gap-2">
          {["Home", "About", "Contact"].map((v, i) => {
            return (
              <Button
                onClick={() => {
                  handleClick(v);
                }}
                className="text-black text-lg font-semibold hover:bg-white hover:border-b-2 hover:border-b-baseColor"
              >
                {/* <a href={"#" + v.toLowerCase()}></a> */}
                {v}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="flex items-center">
        <Button className="text-white bg-baseColor" onClick={handleConnect}>
          {text}
        </Button>
      </div>
    </div>
  );
}
