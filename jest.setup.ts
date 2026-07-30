import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'util'

// jsdom ships neither, and react-dom/server needs both.
Object.assign(globalThis, { TextEncoder, TextDecoder })
