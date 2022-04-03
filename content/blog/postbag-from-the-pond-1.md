---
title: Postbag from the Pond 1
description: "Our first blog post! We discuss the recent changes to duck.community site.
The addition of the ZRC-6 coloured ducks. LP rewards are back on the menu for Zilswap. XCAD/DUCK launch and single sided staking with DXCAD. 
A project status update including all of the duck products."
alt: Postbag from the Pond 1
---

# Postbag from the Pond 1

There's a lot to cover in this new article style format post from Duck team, so lets discuss all the recent updates that have been happening.

## New duck.community website

Firstly, let's start off by appreciating the new front-end styling Neeko has been working on. The whole site is brazy. Great job. Also, this blog page styling is great too. Now we can start to do more of these!

Amongst all the styling updates, there are a tonne of speed enhancements regarding how we pull data from IPFS. Previously, Duck NFTs would timeout due to 429 'Too many requests' when users would attempt to speedrun the viewer part of the old website. This was because we peppered IPFS with too many requests. We did try a round-robin approach where we would request 10 providers to get 10x the throughput, but eventually, the throughput 'enhancement' was no match for the speedrunners clicking through the pagination options. 

OK, so directly loading the asset from IPFS was a rookie idea. What's the right solution, though?
There are different ways to implement faster IPFS solutions. The easiest way is to pay. But honestly Duck infrastructure costs are minimal to the point where an IPFS node would be maybe triple the current infrastructure cost. Ok so paying 3 times the current infrastructure stack isn't really ideal for us; that's a continued cost too. Is there any other way to squeeze better performance for our site for IPFS images?

The long answer for Zilkroad marketplace is that we will use an outsourced layer of perma-caching to reduce the lookup time to load the resource from IPFS. This solution is much more robust if we ever hit several thousand concurrent users.
The short answer with Duck is that we can utilise a feature of ZRC-7 metadata, namely that we can have our own section of metadata. Having a quick resource on the surface web that will never 429 (and break our heart) but more importantly, the main asset is still on IPFS, and will be to any ecosystem project that looks for the asset resource.

So does that mean other ecosystem partners will return 429 when they query IPFS? Yeah, I guess so. Each ecosystem partner needs to resolve and deal with the 429 problem when they meet demand and scale. Unless they want to pay for a node, which at this point in time doesn't sound too unattractive considering the workaround headaches.

Another point to mention is the clear distinction between Duck Token and Duck NFT. The fungible tokens are viewable in the top navigation where they are clickable to get the reward modal. The Duck NFTs reside on the 'Your Ducks' page.

## New team members

The Duck team wishes farewell to Hatzz as he embarks on another journey. Hatzz's work is still being used by the team today, and we thank him for his contributions and learning experiences exchanged.

On a lighter note, we haven't formally mentioned some of our new hires we brought on pre-Christmas.

Prodpeak is a seasoned developer, business owner, and investor. He brings to the table a wealth of experience in big data processing and is involved with our indexer work and complex deployment pipelines. His knowledge of other protocols and contracts is a huge help when we are doing analysis work.

50Cal is an old friend (of Nines) from university. He has a tonne of front-end and design knowledge, which we've been putting to good use on Zilkroad. If you haven't heard about the last space we did, check it out here. If you ask nicely in Discord, he might throw you some design alpha. 50 is pretty old school, preferring writing pure CSS rather than using tooling alternatives like Tailwind.

Nicfus is another friend from university. Also coming with design, front-end experience (does it seem like Javascript is in fashion now?) and a background in e-commerce, Nicfus will be a key stakeholder in delivering the 50's design for Zilkroad. JavascriBadman (as you might have guessed) is another university friend of Nines.

Badman comes from a database and big data background and has dropped some of the largest databases in Europe. He's helping with some of the architectural decisions, CI/CD, and part-timing as a product owner for Zilkroad when that launches. Doesn't like Javascript but loves cats.

OK, I'll stop roping all of my friends into duck now...

## New ZRC-6 ducks

So, you may have heard about a new contract or that the ducks are being migrated.

This is true. We are moving from our old [ZRC-1](https://viewblock.io/zilliqa/address/zil1qmmsv4w54fvpnec32cltywpk24zf7f8fftmfmp) NFD contract to the new [ZRC-6](https://viewblock.io/zilliqa/address/zil132e27rxvaecetf7pvqc0hh77v5qajxgrdl8rav) standard.
This basically allows us to do a few things to enhance some of the older code we wrote, whilst also gaining benefits from the new, a double upgrade if you will. In no particular order, here's a list of things we have enhanced.

* Ducks load faster on duck.community because of fast resource surface web lookup
* ZRC-6 has enhancements to allow it to be composed in other contracts easier than ZRC-1 (callback fix - this started the whole ZRC-6/7 journey for us!)
* ZRC-6 has royalty recipient revenue share* ZRC-7 metadata standard, same as fast resource lookup, but now composable everywhere, by anyone, at anytime

So lots of people get confused about what ZRC-6 and ZRC-7 are, so let's quickly remind everyone what's what.

* ZRC-1 - Old NFT, no royalty, no composability
* ZRC-2 - Fungible token
* ZRC-6 - New standard NFT, royalties
* ZRC-7 - JSON metadata standard for ZRC-6
  
So when we talk about ZRC-6, we're talking about the token you see on viewblock, the thing you sell on a marketplace. The token image and attributes want to be presented in the shape that ZRC-7 provides. This is because if everyone uses the same metadata standard, ecosystem partners won't have to write specific cases for the projects that want to specify their metadata differently.
So we spoke about the shape in which a web asset is presented, typically defined by some URL that points to a resource.

```www.example.com/image.jpg```

So this is where ZRC-7 comes in and enlightens us on the concept of metadata.

Metadata means data about data. What's better than just an image? An image with some associated data to display next to it. ZRC-7 has a particular shape. If you want to check it out, you can read the specification [here](https://github.com/Zilliqa/ZRC/blob/main/zrcs/zrc-7.md).

So let's discuss a ZRC-7 example.
Instead of pointing to an image, let's instead point to some JSON metadata which contains both the image and some extra metadata. You can query the below example and get the following JSON resource.

```https://api.duck.community/duck/1```

```json
{
  "resources": [
    {
      "uri": "ipfs://QmamvNSFL3EZfPyeV9W26t7aa5afnXTY8DsU3TZ3nyDJ5Y"
    }
  ],
  "resource_mimetype": "image/png",
  "attributes": [
    ...
  ],
  "transparent": "ipfs://QmY9q4d7K8J4MV7SmwZL3xFXYJdwAsCefuTwV9iCGbmJNe",
  "quick_resource": "https://d22rrd5cdtalai.cloudfront.net/DUCK_0001_bb3236c9cc9099ce.png"
}
```

A bit of reading on the specification will tell ecosystem partners to consume "ipfs://" as an IPFS image, and they can handle the choice of where to get the image served to them (in fact, we had to do this, as discussed previously, but we had to mangle the string uri to do the lookup to remove the hardcoded provider for the old duck implementation). This is a much more generic way to handle IPFS resources.

## Migration from ZRC-1 to ZRC-6

OK, enough technical chat, just tell me what I need to do to upgrade.


If you head over to https://duck.community which you should be, or how are you reading this blog? When you click on "Your Ducks' there should be a popup that appears telling you how many ZRC-1 ducks you have, how many claims are needed, and how much ZIL you'll be refunded by the contract.
The website will claim 5 ducks at a time, so if you hold 11, you'll send 3 transactions of 5/5/1 - you'll be refunded ```(4 ZIL * 5) + (4 ZIL * 5) + (4 ZIL * 1)```. After claiming that pop-up modal will disappear, you'll see your ducks in the 'Your Ducks' section below.

I lied, more technical chat.

While doing this process, migrating from ZRC-1 to ZRC-6, we had some time to think about different methods of migration. Obviously, the easy ideas come first. Mint everyone another ZRC-6 token and they'll have two floating around of the same token. I don't like this. It defeats the whole purpose of only one being present in a user's wallet. The old one will always remain with the user.

Ok, what about if we use a workflow Ducks are typical to using? Proxy call ``Mint``` and let a migrator contract handle mints for a new contract (burn the old, mint the new). But due to the incrementing IDs of ZRC-6 if user 1000 came along first to migrate, they would get token 1 instead of token 1000.

The solution is obvious to us now. Mint all the tokens to a contract which would hold custody of them. They would be in the right order as they would all be minted together. Then have the custodian burn the ZRC-1 of token_id X from the user. Then the custodian transfers the ZRC-6 of the same token_id X back to the user. This means that as the old one is destroyed, a new one is removed from custody into general circulation

With a bit of testing later, we discovered that with a burn, NFT transfer, and a transfer of ZIL (we will call these '3 actions' but they each have their own gas complexity) would work 5 times. Because we can't migrate 100 calls at once, we had to do some work in the frontend to handle batching multiple calls. From a developer standpoint, one does need to consider the gas limit of operations. This was a good example of how iterative calls can blow up gas limits.

## Migration for all the other projects ZRC-1's

Yes, all the things, but only in groups of 5.

If other ZRC-1 projects want to use our migrator custodian, then feel free to use it at your own risk. We obviously want everyone to gain from our learning, so the tools are available if you want to implement it or, perhaps, improve it. We will provide a readme for the contract and some zilliqa-js code, the rest is up to the project owner.

As the migrator has been live for a few weeks now, we are pretty confident in its functional behaviour. Expect to see the migrator and readme documentation on the Duck Github in a week or so.

## Bugs!

You may have noticed we didn't come bolting out of the gate with announcements of all the new features. We were nursing some bugs as we migrated and wanted to do this in as low-key a method as possible. Some of you eagle-eyed ducks saw this within a few hours of our deployment! Some of the initial bugs are included.

* Transactions over 5 ducks were allowed and got gas limited, resulting in failed transactions
* Metadata for some migrated ducks showed the original value
* Valid LP reward rows were showing as 'claimed'
  
All in all, a pretty good bug count with low severity. Some parts of development/release seemed slow, but I forget to remind myself that this isn't a day-job operation. This is all done in our spare time, typically between 7 PM and 3 AM, so sometimes we get a bit pooped with the work/life/duck balance and need the time to recharge. Thanks for your continued patience whilst we get through the development work.

## New Multibuy process

We've all improved so much this year, technically. From these improvements, we figured out a novel way to calculate multiple buys on the curve over multiple people. If you didn't know, each duck cost an increasing unique amount depending on where in the curve (`cost = (x^3) / 120000 + 1200x` where x is the number of ducks minted.)

Previously, if you tried to mint a duck and your friend did too, your transactions are in the same block. The first person to buy the current duck curve, the price of the next duck increases. Your friend comes to buy and is instantly rejected because the curve price increased. It may have increased by a fraction of a zil, but because it wasn't the correct amount, it is rejected.

The buying proxy now has a mechanism where if you buy a duck and overpay, let's say you pay 5k ZIL for a 1500 ZIL NFT from the proxy. It will first calculate that you've only spent 1500 and then return the remainder, 3500 to the user. Allowing users to overpay, but be refunded the difference is key here, as we don't know how much the curve is increasing by for each block. Currently, users overpay by 1 ZIL, which from Neeko's calculation would be sufficient.
The proxy contract can now handle batch minting, so the two features combined allow for multibuy minting to happen without errors occurring on multiple buys now.

## Zilswap LP rewards from 11-21 - 02-22 now available

Rewards for the Zilswap liquidity provision stopped flowing to the contract sometime in December. We have since revamped the LP reward program to run automagically, so no more missed or late rewards.

We have taken the decision to cut the amount of duck distributed to LP for the reason that the distribution is happening far too fast. We have since reduced the total amount from 5 $DUCK every 23 days to 1 $DUCK a week - only for Zilswap LP. 

## XCAD DEX launch!

We recently worked with our friends at XCAD to bring the Duck token to another DEX!

You can now provide liquidity for the DUCK/XCAD to earn DXCAD.

DXCAD can be used to stake for a particular token (like DUCK!)

![xcad/duck](https://cdn.discordapp.com/attachments/914536079225421904/948720868702445629/unknown.png)

This went down a treat for our users as they can swim on two liquidity pools now whilst market-makers balance the price between the two dexes.

## Roadmap update

We've had some comments about creating a public roadmap for the Duck team. We think this is a good idea to display on the website, primarily to publicise our goals and visions. We ideally want to be scoped relatively tightly, so you won't see a 5 year plan from us, perhaps a 1 year plan.

All great things take time. The roadmap, whilst important, sits at a lower priority for us at the moment as we tackle some of the projects already on our plate.

We want to move away from producing a LaTeX document for each project we release. To do so takes so many developer resources, which we cannot commit to spend at the moment. However, we want to replace these documents with a more robust in-web solution whereby users can go through all the documentation for each product in one place. It's similar to how this blog is setup, but more for technical details.

## Project:Zilkroad update

Zilkroad currently has nearly all of the developer power assigned to it at the moment. We are well into the development phase, which includes, but is not limited to, the following work items:

* Smart contract development
  * Testing/CD
  * Upgradability
* UI implementation
  * UX considerations
* UI interaction with the chain/APIs
  * Chain Indexer API
  * Database API
* Database design
* Scaling infrastructure
  * Cost reduction vs maximizing throughput
* Redundancy, backups and failovers
* Build, deployment and CI
* Security considerations and production hardening
* Speed enhancements through image proxy compression & other best practices

Currently, most components are working in isolation, and some are coupled together. We are now building our testnet instance with the components required. This week, we have managed to get our testnet database deployed and communicating over the VPC subnet with the public API.

The public API communicates with the database to display information to the user regarding the current state of the smart contract and the user's wallet state. The events from the smart contract are consumed by a processor which inserts them into the database. The web client then pulls data from the public API to display to the user.

The next step for us is to get the web client deployed and configure it to use the API. A few more components need to be slotted in after this, but slowly we are progressing towards a full end-to-end workflow.

Wen? I don't know. It happens when it happens. I'm scared to announce another date. The plan is to have internal testing rounds until we are happy with the functionality. Then release this to a very small subset of users to just get an idea of how our users are using the platform and see what feedback they have for us. If everything goes to plan and there are not a lot of extra changes for us to make, then we will publically release the beta testnet instance where developers and artists can test their NFT projects before going to mainnet - this will ensure that users when releasing their NFT projects have the security that if it works on the testnet, then theoretically it will work on the mainnet.

Once the beta is public, then you can assume that the mainnet is not far away. All that will remain is to re-deploy everything over to mainnet, change the configuration and infrastructure hardware. Invitations for the testnet will go out when it's ready.
Here's a snippet of our chain indexer. For all current ecosystem partners, they currently ask a user to know the NFT address location in order to load all of the tokens belonging to the logged in user. Whereas now we have indexed every single block, it is easy for us to query this big data to return all the NFTs belonging to a user.

```json
[
    {
        "contract": "0x8ab2af0cccee7195a7c16030fbdfde6501d91903",
        "zrc6": true,
        "tokenIds": [
            8,
            41,
            231,
            232,
            421,
            1114,
            2030,
            2034,
            2455
        ]
    },
    {
        "contract": "0xc0c333b6ff2a98c6955997d09fee5d160ce1aa9c",
        "zrc6": false,
        "tokenIds": [
            1,
            35
        ]
    }
]
```

The duck indexer is now aware of all the contracts a user has deployed and can identify if this is a ZRC-6. The rest of the implementation to support deploying/managing/minting is easy, and the tools are available and the workflow we are already familiar with.

Expect to see Zilliqa NFT deployment and management become a lot more fluid with Zilkroad.

## Project:Feathers update

Codename 'feathers' is an idea centred around creating a NFT cross fungible hybrid DeFi contract. We've discussed, approved, and then discarded several iterations of design for the DeFi contract, with the contributing factor being that the contract itself had to be sustainable, which is harder to design than we initially thought. A wise man once said, 'It is easy to print a token to a user, but it is much harder to make the printing sustainable over a long period of time'.

We are still very much interested in pursuing a DeFi product further. We require a lot more time to finish our plates so we can retouch on feathers. Let's re-assess this after ZR is live.

## Project:Ponds update

Codename 'ponds' is an undisclosed NFT project, I've discussed at a high-level the intended ideas and mechanics. The project is being worked on by Neeko, Bucko, and Nines. The estimated progress is around 50%, but the priority is lower than the Zilkroad development. I hear you want more information about the secret pond project. All we are able to say at this stage is that it's bullish.

## Signoff

Now we have this slick medium of informing and calling to the community, these updates will become a more regular occurence. And with that, you can catch us at the same time, same place, don't adjust your dials.

A big shout out to the duck team for all the late nights spent discussing all the various parts of the projects we work on. Ducks strong together.:shy_duck:

Nines, Neeko, Bucko, Greeny, 50, Nic, Badman, Prodpeak