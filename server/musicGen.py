import torchaudio
from audiocraft.models import MusicGen
from audiocraft.data.audio import audio_write

model = MusicGen.get_pretrained('melody')
model.set_generation_params(duration=8)  # generate 8 seconds.

descriptions = ['happy rock', 'energetic EDM', 'sad jazz']

# melody, sr = torchaudio.load('./assets/bach.mp3')
# generates using the melody from the given audio and the provided descriptions.
def generateSong(text): 
    print("generate music for:", text)
    wav = model.generate([text])

    for idx, one_wav in enumerate(wav): 
    # Will save under {idx}.wav, with loudness normalization at -14 db LUFS.
        audio_write(f'{idx}', one_wav.cpu(), model.sample_rate, strategy="loudness")
    print("done")