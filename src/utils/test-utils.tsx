import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { AppState, AppStore, setupStore } from '../store'
import { setupServer } from 'msw/node';
import { rest, RequestHandler } from 'msw';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<AppState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

interface HandlerConfig {
    method?: 'get' | 'post' | 'put' | 'delete'; // Add other HTTP methods if needed
    path: string;
    res: (req: any, res: any, ctx: any) => any;
}

export function createServer(handlerConfig: HandlerConfig[]) {
    const handlers: RequestHandler[] = handlerConfig.map((config) => {
        return rest[config.method || 'get'](config.path, (req, res, ctx) => {
            return res(ctx.json(config.res(req, res, ctx)));
        });
    });

    const server = setupServer(...handlers);

    beforeAll(() => {
        server.listen();
    });
    afterEach(() => {
        server.resetHandlers();
    });
    afterAll(() => {
        server.close();
    });
}

