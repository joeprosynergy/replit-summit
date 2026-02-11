"use client";

import { lazy } from "react";

export const LazyAdminEditMode = lazy(() =>
  import("./AdminEditMode").then((m) => ({ default: m.AdminEditMode }))
);
