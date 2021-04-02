import { useState, useEffect } from "react"
import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"

export enum Theme {
  Light = "light",
  Dark = "dark",
}

export const themeStorageKey = "theme"

export const ThemeDropdown = (): JSX.Element => {
  const [appearance, setAppearance] = useState<string>(Theme.Light)

  useEffect(() => {
    const storedAppearance = localStorage.getItem(themeStorageKey)
    if (storedAppearance) {
      setAppearance(storedAppearance)
    }
  }, [])

  const changeAppearance = (_theme) => {
    setAppearance(_theme)
    localStorage.setItem(themeStorageKey, _theme)

    if (_theme == Theme.Dark) {
      document.documentElement.classList.add(Theme.Dark)
    } else {
      document.documentElement.classList.remove(Theme.Dark)
    }
  }

  return (
    <Listbox
      as="div"
      className="flex items-center justify-center md:justify-start space-x-2 mt-8"
      value={appearance}
      onChange={changeAppearance}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="text-sm text-gray-500 dark:text-gray-400">Theme</Listbox.Label>

          <div className="w-24 relative">
            <span className="inline-block w-full rounded-md">
              <Listbox.Button className="text-sm text-gray-800 dark:text-gray-50 cursor-default relative w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-3 pr-10 py-2 text-left focus:outline-black dark:focus:outline-white transition ease-in-out duration-150">
                <span className="block truncate capitalize">{appearance}</span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Listbox.Button>
            </span>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="w-24 absolute -top-24 rounded-md shadow-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600"
            >
              <Listbox.Options static className="py-2 text-sm overflow-auto outline-none">
                {Object.values(Theme).map((_theme) => (
                  <Listbox.Option key={_theme} value={_theme}>
                    {({ selected, active }) => (
                      <div
                        className={clsx(
                          "cursor-default select-none flex items-center justify-between space-x-2 py-2 px-4 text-gray-500 dark:text-gray-400 dark:antialiased hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-500 dark:hover:text-gray-50",
                          {
                            "bg-gray-200 dark:bg-gray-500": active,
                          }
                        )}
                      >
                        <span
                          className={clsx("block truncate capitalize", {
                            "text-gray-800 dark:text-gray-50": selected,
                          })}
                        >
                          {_theme}
                        </span>

                        {selected && (
                          <span className="">
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
