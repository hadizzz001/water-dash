"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };

    try {
      const { data } = await axios.post("/api/auth/login", payload);

      alert(JSON.stringify(data));
      window.location.replace("/dashboard");
    } catch (e) {
      const error = e as AxiosError;

      alert(error.message);
    }
  };

  return (
    // <main className="container" style={{textAlign:"center"}}>
    //   <h4>Login Page</h4>

    //   <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{display: "inline-flex"}}>
    //     <div>
    //       <label htmlFor="username">Username:</label>
    //       <input
    //         type="text"
    //         id="username"
    //         name="username"
    //         required
    //         className="border rounded border-black"
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         type="password"
    //         id="password"
    //         name="password"
    //         required
    //         className="border rounded border-black"
    //       />
    //     </div>

    //     <button
    //       type="submit"
    //       className="p-2 text-white w-fit rounded"
    //       style={{background:"#ab695d"}}
    //     >
    //       Submit
    //     </button>
    //   </form>
    // </main>


    <>
      <>
      <style
  dangerouslySetInnerHTML={{
    __html: "\n    body{\n    background: black !important;\n}\n\n"
  }}
/>

        {/* TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com */}
        <section className="h-screen container" style={{ backgroundColor: "#000" }}>
          <div className="h-full">
            {/* Left column container with background*/}
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12" id="contentMob">
               
              </div>
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                <form onSubmit={handleSubmit}>

                  <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold  text-white">
                      Login
                    </p>
                  </div>
                  {/* Email input */}
                  <div className="relative mb-6" >
                    <input
                      type="text"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear "
                      id="username"
                      name="username"
                      placeholder="Username"
                    />
                    <label
                      htmlFor="username"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out "
                    >

                    </label>
                  </div>
                  {/* Password input */}
                  <div className="relative mb-6" >
                    <input
                      type="password"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear  "
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] "
                    >

                    </label>
                  </div>

                  {/* Login button */}
                  <div className="text-center lg:text-left">
                    <button
                      type="submit"
                      className="inline-block rounded  px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      style={{ background: "#ab695d" }}
                    >
                      Login
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>



      <style
  dangerouslySetInnerHTML={{
    __html: "\n  #sidenavv{\n    display:none;\n  }\n"
  }}
/>



    </>
  );
}