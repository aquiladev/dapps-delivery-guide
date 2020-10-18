
====
IPFS
====

.. image::  ../assets/ipfs.png
    :width: 120px
    :align: center

`InterPlanetary File System (IPFS) <https://en.wikipedia.org/wiki/InterPlanetary_File_System>`_ is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices.

IPFS allows users to not only receive but host content, in a similar manner to BitTorrent. As opposed to a centrally located server, IPFS is built around a decentralized system of user-operators who hold a portion of the overall data, creating a resilient system of file storage and sharing. Any user in the network can serve a file by its content address, and other peers in the network can find and request that content from any node who has it using a distributed hash table (DHT).

Upload to IPFS
--------------

There is a `GitHub Action <https://github.com/marketplace/actions/upload-to-ipfs>`_ which allows to upload a DApp to IPFS on Marketplace.

Input parameters:

+---------------+------------+---------+---------------------------------------------------------------------------------------------------+
| Parameter     | Required   | Service | Description                                                                                       |
+===============+============+=========+===================================================================================================+
| path          | Yes        |         | Directory's path to upload.                                                                       |
+---------------+------------+---------+---------------------------------------------------------------------------------------------------+
| service       | No         |         | Type of target service to upload. Supported services [`ipfs`, `pinata`, `infura`]. Default `ipfs` |
+---------------+------------+---------+---------------------------------------------------------------------------------------------------+
| timeout       | No         |         | Request timeout. Default `60000` (1 minute)                                                       |
+---------------+------------+---------+---------------------------------------------------------------------------------------------------+
| verbose       | No         |         | Level of verbosity [`false` - quiet, `true` - verbose]. Default `false`                           |
+---------------+------------+---------+---------------------------------------------------------------------------------------------------+
| host          | No         | ipfs    | IPFS host. Default `ipfs.komputing.org`                                                           |
+---------------+------------+---------+---------------------------------------------------------------------------------------------------+
| port          | No         | ipfs    | IPFS host's port. Default `443`                                                                   |
+---------------+------------+---------+---------------------------------------------------------------------------------------------------+
| protocol      | No         | ipfs    | IPFS host's protocol. Default `https`                                                             |
+---------------+------------+---------+---------------------------------------------------------------------------------------------------+
| pinataKey     | Yes*       | pinata  | Pinata Api Key. Required for pinata service.                                                      |
+---------------+------------+---------+---------------------------------------------------------------------------------------------------+
| pinataSecret  | Yes*       | pinata  | Pinata Secret Api Key. Required for pinata service.                                               |
+---------------+------------+---------+---------------------------------------------------------------------------------------------------+
| pinataPinName | No         | pinata  | Human name for pin.                                                                               |
+---------------+------------+---------+---------------------------------------------------------------------------------------------------+

In order to use it, you need to add step to `main.yml`::

    - uses: aquiladev/ipfs-action@v0.1.1
      id: upload
      with:
        path: ./build

There will be a build artifact on a runner after `steps <github-actions.html#basic-pipeline-for-a-dapp>`_ (usually in directory `build` or `dist`). You need to pass the directory as a `path` parameter.

The step will have `hash` output — it is needed for later use. Token `${{ steps.upload.outputs.hash }}` can be used in next steps where `upload` is the id of current step.

Upload to IPFS Pinata pinning service
-------------------------------------

The same GitHub Action allows to upload a DApp to `Pinata <https://pinata.cloud/>`_ pinning service. Pinata simplifies immutable data with simple IPFS API and toolkit.

In order to use it, you need to add step to `main.yml`::

    - uses: aquiladev/ipfs-action@v0.1.3
      id: pinata
      with:
        path: ./build
        service: pinata
        pinataKey: ${{ secrets.PINATA_KEY }}
        pinataSecret: ${{ secrets.PINATA_SECRET }}
        pinataPinName: {pin_name}

The output of the upload action is similar to the previous example.