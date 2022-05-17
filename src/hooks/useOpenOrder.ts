import { useState } from "react";

export function useOpenOrder() {
  const [openOrder, setOpenOrder] = useState<any>();
  return { openOrder, setOpenOrder };
}
