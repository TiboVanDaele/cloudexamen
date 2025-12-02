# Vraag 1
Gegeven het IPv4-adres (met netmasker) `172.17.213.23/20`.
Beantwoord volgende vragen:

- Wat is de binaire schrijfwijze van zowel het adres zelf als het netmasker?
adres: 	 1010 1100.0001 0001.1101 0101.0001 0111
netmask: 1111 1111.1111 1111.1111 0000.0000 0000

- Wat is het adres van het netwerk waarop deze host zich bevindt?
172.17.208.0

- Wat is het broadcastadres van dit netwerk?
172.17.223.255

- Wat is het hostgedeelte (binair uitgedrukt)?
0000 0000.0000 0000.0000 1111.1111 1111

- Wat is het laagste en hoogste toegelaten hostadres op dit netwerk (mag binair of decimaal uitgedrukt zijn).
laagste: 172.17.208.1
hoogste: 172.17.223.254

- Hoe veel hosts kunnen er maximaal op dit netwerk aangesloten worden?
(2^12)-2 = 4094

Schrijf bij elke vraag al je tussenstappen op, niet alleen je antwoord.
Dan is een rekenfout geen groot probleem.

# Vraag 2
Is `192.168.109.112/28` een subnet van `192.168.109.64`? Waarom wel/niet? Verklaar je antwoord volledig, alleen "ja" of "nee" volstaat niet.
adres:   1100 0000.1010 1000.0110 1101.0111 0000
netmask: 1111 1111.1111 1111.1111 1111.1111.0000
	 1100 0000.1010 1000.0110 1101.0100 0000
ja, het is een subnet. Dit komt omdat het netwerk adres 192.168.109.64 kan opgedeeld worden in kleinere subnets. Dus dan moet het netwerkgedeelte altijd groter zijn dan het originele netwerkgedeelte. En dat is zo.

# Vraag 3
Gegeven het PacketTracer bestand in bijlage. Configureer de hosts en de routers zodat je vanaf elke host elke andere host kan pingen.

# Vraag 4
Gegeven de NodeJS applicatie in bijlage. Schrijf een Dockerfile om deze website te containerizen (lees de README file!). Je levert drie zaken in:

- de Dockerfile
- de instructie om deze Dockerfile om te zetten naar een image
- de instructie om een container te starten op basis van deze image, zodat je er naartoe kan surfen

Denk eraan dat je kan inloggen op een container door hem eerst op te starten met het commando `sleep infinity`. Op de hostmachine gebruik je dan `docker exec -it containernaam sh`.
