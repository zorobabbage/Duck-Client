---
title: Postbag from the Pond 1
description: Learning how to use @nuxt/content to create a blog
img: 
alt: Postbag from the Pond 1
updatedAt: 01/01/2022
---

# Postbag from the Pond 1

There's a lot to cover in this new article style format post from Duck team, so lets discuss all the recent updates that's been happening.

## New duck.community website

Firstly, let's start of by appreciating the new front-end styling Neeko has been working on. The whole site is on point, great job. Also, this blog page styling is great too, now we can do more of these!  

Amongst all the styling updates, there are a ton of speed enhancements regarding how we pull data from IPFS. Previously, Duck NFT's would timeout due to 429 'Too many requests' when users would attempt to speedrun the viewer part of the old website. This was because correctly we peppered IPFS with too many requests - we did try a round-robin approach where we would request 10 providers to get 10x the throughput, but eventually, the throughput 'enhancement' (hack) was no match for the speedrunners clicking through the pagination options.

Ok, so directly loading from IPFS was a rookie idea. What's the right solution? 

There are a ton of different ways to implement faster IPFS solutions, the easiest way is to pay. But honestly Duck infastructure costs are minimal to the point where an IPFS node would be maybe double or triple the current infastructure cost. Ok so paying 3 times the current stack isn't really nice for us to swallow, that's a continued cost too, is there any other way to squeeze some performance for our site for IPFS images?

The long answer with Zilkroad marketplace is that we will use an outsourced layer of perma-caching to reduce the lookup time to load the resource from IPFS.

The short answer with Duck is that we can utilise a feature of ZRC-7 metadata, being that we can have our own section of metadata. Having a quick resource on the surface web that will never 429 and break our heart - but more importantly, the main asset is still on IPFS, and will be to any ecosystem project that looks for ducks NFT.

So does that mean other ecosystem partners will 429 when they query IPFS?

Yeah I guess so, each ecosystem partner needs to resolve the 429 problem when they meet demand and scale. Unless they want to pay for a node, which at this point in time doesn't sound too unattractive considering the workaround headaches.

Another point to mention is now the clear distinction between Duck Token and Duck NFT is now much clearer with tokens being in the header, where it's clickable to get the reward modal. The Duck NFT's reside on the 'Your Ducks' page. More on rewards later I guess.

## New team members

The Duck team wishes farewell to Hatzz as he embarks on another journey. Hatzz's work is still being utilised by the team today and we thank him for his contributions and learning experiences exchanged.

On a lighter note, we haven't formally mentioned some of our new hires we've brought on pre Christmas.

Prodpeak is a seasoned developer, business owner and investor. He brings to the table a wealth of experience in big data processing and is involved with our indexer work and complex deployment pipelines.

50Cal is an old friend (of Nines) from University. He has a ton of front-end and design knowledge which we've been putting to good use on Zilkroad. If you haven't heard the last spaces we did, check it out [here](). If you ask nicely in Discord, he might throw you some design alpha.

Nicfus is another friend from University. Also coming with design, front-end experience (does it seem javascript is in fashon now?) and with a background in e-commerce. Nicfus will be a key stakeholder in delivering 50's design for Zilkroad. 

Badman (can you guess) is another friend from University. Badman comes from a Database and big data background and has dropped some of the largest databases in Europe. He's helping with the architecture decision, project planning and part timing as a product owner for Zilkroad when that launches. Doesn't like Javascript, loves cats.

Ok, I'll stop roping friends into my project now...


## New ZRC-6 ducks

So, you may of heard about a new contract or that the ducks are being migrated.

This is true. We are moving from our old [ZRC-1]() NFD contract to the new [ZRC-6]() standard.

This basically allows us to do a few things to enhance some of the older code we wrote, whilst gaining benefits from the new, a double upgrade if you will. In no particular order, here's a list of things we can/have/will enhance.

* Ducks loading faster on duck.community because of fast resource surface web lookup
* Our old ZRC-1 contract had custom duck code which broke the standard, we should now be seen on viewblock as our contract is exactly the standard, any additional code we will add contracts around ZRC-6
* ZRC-6 has enhancements to allow it to be composed in other contracts easier than ZRC-1 (callback fix - this started a long journey for us...)
* ZRC-6 has royalty recipient revenue share, which the team obviously want to enjoy
* ZRC-7 metadata standard, same as fast resource lookup, but now composable everywhere, by anyone, at anytime

So lots of people get confused about what ZRC-6 and ZRC-7 are, so lets quickly remind everyone what's what.

* ZRC-1 - Old standard NFT
* ZRC-2 - Fungible Token
* ZRC-6 - New standard NFT
* ZRC-7 - Metadata standard

So when we talk about ZRC-6, we're talking about the token you see on viewblock, the thing you sell on a marketplace. On ZRC-1, typically you'd just have the resource asset and that was that. ZRC-6 has the same feature, enhanced to actually support either a base_uri/token_id or token_uri - but that's really beside the point. ZRC-6 has the same shape as ZRC-1 for assets is really all we need to know, it just has an extra optional way to use it.

So we spoke about that shape for an asset typically being just an asset right, either IPFS or surface web. It would look like this shape below

```www.example.com/image.jpg```

Where the developer or artist would insert the image into the resource link.

So this is where ZRC-7 comes in and enlightens us to metadata. Metadata means data about data. What's better than just an image? An image with a ton of associated data to display next to it. Now ZRC-7 has a particular shape, if you want to check it out, you can read the specification [here](), but i'm going to continue.

So let's discuss a ZRC-7 example, stay with me here. 

Instead of pointing to an image, lets instead point to some JSON metadata which contains both the image and some metadata associated. You can query the below example and get the following json resource.

```https://api.duck.community/duck/1```

```json
{
  "resource": "ipfs://QmamvNSFL3EZfPyeV9W26t7aa5afnXTY8DsU3TZ3nyDJ5Y",
  "resource_mimetype": "image/png",
  "attributes": [
      ...
  ],
  "transparent": "ipfs://QmY9q4d7K8J4MV7SmwZL3xFXYJdwAsCefuTwV9iCGbmJNe",
  "quick_resource": "https://d22rrd5cdtalai.cloudfront.net/DUCK_0001_bb3236c9cc9099ce.png"
}
```

A bit of reading on the specification will tell ecosystem partners to consume 'ipfs://' as an IPFS image, and they can handle the choice of where to get the image served to them (infact we had to do this, as discussed previously, but we had to mangle the string uri to do the lookup to remove the hardcoded provider), this is a much more generic way to handle IPFS resources.

## Migration from old to new

Ok enough technical chat, tell me what I need to do to upgrade.

If you head over to duck.community and click 'Your Ducks' there should be a popup which appears telling you how many ZRC-1 ducks you have, how many claims are needed and how much ZIL you'll be refunded by the contract. 

The website will claim 5 ducks at a time, so if you hold 11, you'll send 3 transactions of 5/5/1 - you'll be refunded ```4Z*5 + 4Z*5 + 4Z*1```. After claiming that pop-up modal will disapear and you'll see your ducks in the 'Your Ducks' section below.

I lied, more technical chat.

Doing this process, migrating from ZRC-1 to ZRC-6 - we had some time to think about different methods of migration. 

Obviously the easy ideas come first - mint everyone another ZRC-6 token, and have two floating around of the same token - no, I don't like this, it defeats the whole purpose of only ever one being present in a users wallet. 0/10.

Ok, what about if we use a workflow we're typical to using? Proxy call mint and let a proxy migrator handle mints to a new contract, burn the old mint the new. Due to the incrementing ID's of ZRC-6 if user 1000 came along first to migrate, they would get token 1. 0/10.

The solution is obvious to us now, but speaking it out loud, it sounded like it could work. Mint all the tokens to a contract which would hold custody of them. They would be in the right order as they would all be minted together. Then have the custodian burn the ZRC-1 of token_id X from the user then the custodian then transfers ZRC-6 of the same token_id X back to the user - meaning as the old one is destroyed a new one is removed from custody. 10/10. Fits all of the requirements.

With a bit of testing later, we discovered with a burn, transfer and a transfer of zil (we will call these '3 actions' but they each have their own gas complexity) would work 5 times. Meaning we had to do some work in the frontend to handle now batching multiple calls, because we can't migrate 100 at once. From a developer standpoint, one does need to consider the gas limit of operations, this was a good example of how iterative calls can blow up gas limits.

## Migration for all the ZRC-1's

Yes, all the things, but only in groups of 5.

If other ZRC-1 project want to use our migrator custodian then you can feel free to use it at your own risk. We obviously want everyone to gain from our learning so the tools are available if you want to implement it or better perhaps, improve it. We will provide a readme for the contract and some zilliqa-js code, the rest is up to the project owner.

## Bugs! 

You may have notice we didn't come out of the gate with announcements. We was nursing some bugs as we migrated and wanted to do this in as lowkey a method as possible. Some of the inital bugs included.

* Transactions over 5 ducks were allowed and got gas limited, resulting in failed transactions
* Metadata for some migrated ducks showed the original value

All in all pretty good bug count, some development seemed slow, but I forget this isn't a day operation, this is all in our spare time 7PM-3AM duck dev team hours after work, so sometimes we get a bit pooped ourselves. 

## New Multibuy process

We've all improved so much this year technically. From these improvements, we figured out a novel way to calculate multiple buys on the curve over multiple people. If you didn't know, each duck cost a inceasing unique amount depending on where in the curve (calc here)

Previously, if you tried to mint a duck, and your friend does too - and your transactions are in the same block. The first person would buy the current duck curve price, the price of the next duck increases. Your friend comes to buy and is instantly rejected because the curve price increased, it may have increased by a fraction of a zil, but because it wasn't the correct amount, it's rejected.

The buying proxy now has a mechanism where if you buy a duck and overpay, lets say you pay 5k ZIL for a 1500 ZIL NFT from the proxy. It will firstly calculate you've only spent X amount, and check what you sent - sending you the remainder. Allowing users to overpay, but be refunded the difference is key here, as we don't know how much the curve is increasing. Currently users overpay by 1 ZIL, which from neekos calculation would require a lot of buying in a single block to occur.

The proxy contract now can handle batch minting so the two features combined allow for multibuy minting to happen without errors now.

## Zilswap LP rewards from 11-21 - 02-22 now available

Rewards for Zilswap liquidity providing stopped flowing to the contract

## XCAD DEX launch!

Liquidity split
DXCAD

## New Automated Rewards

## Roadmap update

## Project:Feathers update

## Project:Ponds update

## Signoff

Now we have this medium of informing and calling to the community, these updates should become a more regular occurance. And with that, you can catch us at the same time, same place, don't adjust your dials. 

:shy_duck:

Nines, Neeko, Bucko, Greeny, 50, Nic, Badman