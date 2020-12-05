import React from "react"
import { render } from "@testing-library/react"
import Home from "./index"

test("renders home page", () => {
  const { getByText } = render(<Home />)
  const el = getByText("Home")
  expect(el).toBeInTheDocument()
})
