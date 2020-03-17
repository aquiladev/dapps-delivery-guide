
==============
Ethereum Swarm
==============

Swarm - Decentralised data storage and distribution: Swarm is a peer to peer data sharing network in which files are addressed by the hash of their content. Similar to Bittorrent, it is possible to fetch the data from many nodes at once and as long as a single node hosts a piece of data, it will remain accessible everywhere. This approach makes it possible to distribute data without having to host any kind of server - data accessibility is location independent. Other nodes in the network can be incentivised to replicate and store the data themselves, obviating the need for hosting services when the original nodes are not connected to the network.

Upload to Swarm
---------------

There is a `GitHub Action <https://github.com/marketplace/actions/upload-to-swarm>`_ which allows to upload a DApp to Swarm on Marketplace.

In order to use it, you need to add step to `main.yml`.::

    - uses: aquiladev/swarm-action@v0.1.1
      id: upload
      with:
        path: ./build

There will be a build artifact on a runner after `steps <github-actions.html#basic-pipeline-for-a-dapp>`_ (usually in directory `build` or `dist`). You need to pass the directory as a `path` parameter.

The step will have `hash` output — it is needed for later use. Token `${{ steps.upload.outputs.hash }}` can be used in next steps where `upload` is the id of current step.

