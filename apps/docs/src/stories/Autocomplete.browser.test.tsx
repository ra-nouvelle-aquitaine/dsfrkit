import { composeStories } from '@storybook/react-vite'
import { test } from 'vitest'
import * as stories from './Autocomplete.stories'

const { Default, AsyncSearch } = composeStories(stories)

test('autocomplete default flow works in browser', async () => {
  await Default.run()
})

test('autocomplete async flow works in browser', async () => {
  await AsyncSearch.run()
})
