import * as speechCommands from '@tensorflow-models/speech-commands'
const URL = 'https://teachablemachine.withgoogle.com/models/ADyN_mkXT/'
export const usePaimonAI = async () => {
  const checkpointURL = URL + 'model.json'
  const metadataURL = URL + 'metadata.json'
  const recognizer = speechCommands.create(
    'BROWSER_FFT',
    undefined,
    checkpointURL,
    metadataURL
  )
  await recognizer.ensureModelLoaded()
  return recognizer
}
