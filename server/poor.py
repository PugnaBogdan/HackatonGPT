import torch
import random
from unidecode import unidecode
from samplings import top_p_sampling, temperature_sampling
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from tqdm import tqdm

device = "cuda"

def generate_abc(text, num_tunes, max_length, top_p, temperature, seed):

    try:
        seed = int(seed)
    except:
        seed = None

    print("Input Text:\n" + text)
    text = unidecode(text)
    tokenizer = AutoTokenizer.from_pretrained('sander-wood/text-to-music')
    model = AutoModelForSeq2SeqLM.from_pretrained('sander-wood/text-to-music')
    model = model.to(device)

    input_ids = tokenizer(text, 
                        return_tensors='pt', 
                        truncation=True, 
                        max_length=max_length)['input_ids'].to(device)
    decoder_start_token_id = model.config.decoder_start_token_id
    eos_token_id = model.config.eos_token_id
    random.seed(seed)
    tunes = ""

    for n_idx in range(num_tunes):
        print("\nX:"+str(n_idx+1)+"\n", end="")
        tunes += "X:"+str(n_idx+1)+"\n"
        decoder_input_ids = torch.tensor([[decoder_start_token_id]])

        for t_idx in range(max_length):
            
            if seed!=None:
                n_seed = random.randint(0, 1000000)
                random.seed(n_seed)
            else:
                n_seed = None
            outputs = model(input_ids=input_ids, 
            decoder_input_ids=decoder_input_ids.to(device))
            probs = outputs.logits[0][-1]
            probs = torch.nn.Softmax(dim=-1)(probs).cpu().detach().numpy()
            sampled_id = temperature_sampling(probs=top_p_sampling(probs, 
                                                                top_p=top_p, 
                                                                seed=n_seed,
                                                                return_probs=True),
                                            seed=n_seed,
                                            temperature=temperature)
            decoder_input_ids = torch.cat((decoder_input_ids, torch.tensor([[sampled_id]])), 1)
            if sampled_id!=eos_token_id:
                sampled_token = tokenizer.decode([sampled_id])
                tunes += sampled_token
            else:
                tunes += '\n'
                break

    return tunes



print(generate_abc("This is a deep and bass-heavy dubstep track with another track for high beats.\nNote Length-1/16\nMeter-4/4\nKey-E\nBPM-140\nBass-Heavy", 1, 1024, 0.9, 1.0, 0))