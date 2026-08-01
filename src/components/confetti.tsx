"use client";

import type { ReactNode } from "react";
import {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import type {
  CreateTypes as ConfettiInstance,
  GlobalOptions as ConfettiGlobalOptions,
  Options as ConfettiOptions,
} from "canvas-confetti";

type Api = {
  fire: (options?: ConfettiOptions) => void;
};

type Props = React.ComponentPropsWithRef<"canvas"> & {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
  children?: ReactNode;
};

export type ConfettiRef = Api | null;

const DEFAULT_GLOBAL_OPTIONS: ConfettiGlobalOptions = {
  resize: true,
  useWorker: true,
};

const ConfettiContext = createContext<Api>({} as Api);

const Confetti = forwardRef<ConfettiRef, Props>((props, ref) => {
  const {
    options,
    globalOptions = DEFAULT_GLOBAL_OPTIONS,
    manualstart = false,
    children,
    ...rest
  } = props;
  const instanceRef = useRef<ConfettiInstance | null>(null);
  const resolvedGlobalOptions = useMemo(
    () => ({ ...globalOptions, resize: true }),
    [globalOptions],
  );
  const canvasNodeRef = useRef<HTMLCanvasElement | null>(null);
  const loadPromiseRef = useRef<Promise<ConfettiInstance | null> | null>(null);

  const canvasRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      if (node === null) {
        instanceRef.current?.reset();
        instanceRef.current = null;
        canvasNodeRef.current = null;
        loadPromiseRef.current = null;
        return;
      }
      canvasNodeRef.current = node;
    },
    [],
  );

  const loadInstance = useCallback(async () => {
    if (instanceRef.current) return instanceRef.current;
    if (!canvasNodeRef.current) return null;
    if (!loadPromiseRef.current) {
      loadPromiseRef.current = import("canvas-confetti")
        .then(({ default: createConfetti }) => {
          const node = canvasNodeRef.current;
          if (!node) return null;
          const instance = createConfetti.create(node, resolvedGlobalOptions);
          instanceRef.current = instance;
          return instance;
        })
        .finally(() => {
          loadPromiseRef.current = null;
        });
    }
    return loadPromiseRef.current;
  }, [resolvedGlobalOptions]);

  const fire = useCallback(
    (overrides: ConfettiOptions = {}) => {
      void loadInstance().then((instance) => {
        instance?.({ ...options, ...overrides });
      });
    },
    [loadInstance, options],
  );

  const api = useMemo(() => ({ fire }), [fire]);

  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) fire();
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} {...rest} />
      {children}
    </ConfettiContext.Provider>
  );
});

Confetti.displayName = "Confetti";

export { Confetti };
